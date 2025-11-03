import { useEffect, useState, useRef } from "react";
import NavBarLogged from "../components/NavBarLogged";
import { GetAllUser } from "../func/getAllUser";

const MessagePage = () => {
  const currentUserId = parseInt(sessionStorage.getItem("id"));
  const [matches, setMatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef();
  const [unreadCounts, setUnreadCounts] = useState({}); // {matchId: count}

  // Récupérer les matches et calculer les messages non lus
  useEffect(() => {
    const fetchMatches = async () => {
      const allUsers = await GetAllUser();
      const currentUser = allUsers.find(u => u.id === currentUserId);
      if (!currentUser) return;
      const matchesFiltered = allUsers.filter(u => currentUser.matchs?.includes(u.id));
      setMatches(matchesFiltered);

      const counts = {};
      for (const m of matchesFiltered) {
        const convId = getConversationId(currentUserId, m.id);
        const res = await fetch(`http://localhost:8080/api/message/${convId}`);
        if (res.ok) {
          const data = await res.json();
          const parsed = parseMessages(Array.from(data.items));
          counts[m.id] = parsed.filter(msg => !msg.fromMe && !msg.read).length;
        } else {
          counts[m.id] = 0;
        }
      }
      setUnreadCounts(counts);
    };
    fetchMatches();
  }, [currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredMatches = matches.filter(m =>
    `${m.name} ${m.fname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getConversationId = (id1, id2) => id1 < id2 ? `${id1}and${id2}` : `${id2}and${id1}`;

  const parseMessages = (items) => {
    if (!items || !items.length) return [];
    return items.map(item => {
      // Nouveau format: "timestamp senderId true read_true texte"
      const parts = item.split(" ");
      const timestamp = Number(parts[0]);
      const senderId = Number(parts[1]);
      const fromMe = senderId === currentUserId;
      const read = parts[3] === "read_true";
      const text = parts.slice(4).join(" ");

      return { timestamp, fromMe, read, text };
    });
  };

  const loadMessages = async (match) => {
    setSelectedMatch(match);
    const convId = getConversationId(currentUserId, match.id);
    const res = await fetch(`http://localhost:8080/api/message/${convId}`);
    if (!res.ok) return setMessages([]);
    const data = await res.json();
    setMessages(parseMessages(Array.from(data.items)));

    // mettre à jour les messages non lus pour ce match
    setUnreadCounts(prev => ({ ...prev, [match.id]: 0 }));
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedMatch) return;

    const convId = getConversationId(currentUserId, selectedMatch.id);
    const timestamp = Date.now();
    const msgStr = `${timestamp} ${currentUserId} true read_true ${newMessage}`;

    setMessages(prev => [...prev, { timestamp, fromMe: true, read: true, text: newMessage }]);
    setNewMessage("");

    await fetch("http://localhost:8080/api/message/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: convId, mess: msgStr })
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBarLogged />

      <div className="flex flex-1 bg-gray-100">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-300 bg-white flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {filteredMatches.map(m => {
              const unread = unreadCounts[m.id] || 0;
              return (
                <div
                  key={m.id}
                  className={`flex items-center justify-between p-3 cursor-pointer transition-all rounded-lg my-1 hover:bg-pink-50 ${selectedMatch?.id === m.id ? "bg-pink-100" : ""
                    }`}
                  onClick={() => loadMessages(m)}
                >
                  <div className="flex items-center">
                    <img src={m.image || "/default-avatar.png"} alt="avatar" className="w-12 h-12 rounded-full mr-3 border-2 border-pink-400" />
                    <div>
                      <p className="font-semibold text-gray-700">{m.name} {m.fname}</p>
                    </div>
                  </div>
                  {unread > 0 && (
                    <div className="bg-pink-600 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                      {unread > 9 ? "9+" : unread}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {selectedMatch ? (
              <>
                <h2 className="text-xl font-bold mb-4 border-b border-gray-300 pb-2 text-pink-600">
                  {selectedMatch.name} {selectedMatch.fname}
                </h2>
                <div className="space-y-3">
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl max-w-xs shadow-md break-words ${m.fromMe ? "bg-pink-600 text-white ml-auto" : "bg-white text-gray-800 mr-auto"
                        }`}
                    >
                      <span className="text-xs text-gray-400 block mb-1">{new Date(m.timestamp).toLocaleTimeString()}</span>
                      <p>{m.text}</p>
                    </div>
                  ))}
                  <div ref={messagesEndRef}></div>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center mt-32">Sélectionnez un utilisateur pour discuter</p>
            )}
          </div>

          {selectedMatch && (
            <div className="p-4 border-t border-gray-300 flex bg-white">
              <input
                type="text"
                placeholder="Tapez un message..."
                className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="ml-3 px-5 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 shadow-lg transition-colors"
              >
                Envoyer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
