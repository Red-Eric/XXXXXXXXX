package com.dating.datingApp.Controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dating.datingApp.Entity.Users;
import com.dating.datingApp.Repository.UserRepository;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserRepository userRepo;

    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public void checkAndAddMatchesForAllUsers() {
        List<Users> users = userRepo.findAll();

        for (Users user1 : users) {
            for (Users user2 : users) {
                if (!user1.equals(user2) && user1.getILikes().contains(user2.getId())
                        && user2.getILikes().contains(user1.getId())) {
                    if (!user1.getMatchs().contains(user2.getId())) {
                        user1.getMatchs().add(user2.getId());
                    }
                    if (!user2.getMatchs().contains(user1.getId())) {
                        user2.getMatchs().add(user1.getId());
                    }
                    userRepo.save(user1);
                    userRepo.save(user2);
                }
            }
        }
    }

    public void checkAndUpdateMatch(Integer userId1, Integer userId2) {
        Optional<Users> userOpt1 = userRepo.findById(userId1);
        Optional<Users> userOpt2 = userRepo.findById(userId2);
    
        if (userOpt1.isPresent() && userOpt2.isPresent()) {
            Users user1 = userOpt1.get();
            Users user2 = userOpt2.get();
    
            // Si les deux se like encore → ajouter match
            if (user1.getILikes().contains(userId2) && user2.getILikes().contains(userId1)) {
                user1.getMatchs().add(userId2);
                user2.getMatchs().add(userId1);
            } else { // Sinon → retirer match
                user1.getMatchs().remove(userId2);
                user2.getMatchs().remove(userId1);
            }
    
            userRepo.save(user1);
            userRepo.save(user2);
        }
    }
    

    public void checkAndAddMatch(Integer userId1, Integer userId2) {
        if (userId1 == null || userId2 == null) {
            throw new IllegalArgumentException("Invalid input");
        }

        Optional<Users> userOpt1 = userRepo.findById(userId1);
        Optional<Users> userOpt2 = userRepo.findById(userId2);

        if (userOpt1.isPresent() && userOpt2.isPresent()) {
            Users user1 = userOpt1.get();
            Users user2 = userOpt2.get();

            if (user1.getILikes().contains(userId2) && user2.getILikes().contains(userId1)) {
                user1.getMatchs().add(userId2);
                user2.getMatchs().add(userId1);
                userRepo.save(user1);
                userRepo.save(user2);
            }
        } else {
            throw new IllegalStateException("One or both users not found");
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        checkAndAddMatchesForAllUsers();
        return ResponseEntity.ok(userRepo.findAll());
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody Users user) {
        Users savedUser = userRepo.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PostMapping("/visitor")
    public ResponseEntity<String> addVisitor(@RequestBody Map<String, Integer> reqBody) {
        Integer idUser = reqBody.get("idUser");
        Integer idVisitor = reqBody.get("idVisitor");

        if (idUser == null || idVisitor == null) {
            return ResponseEntity.badRequest().body("Invalid input");
        }

        Optional<Users> userOpt = userRepo.findById(idUser);
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            if (!user.getVisitor().add(idVisitor)) {
                return ResponseEntity.ok("Already exists");
            }
            userRepo.save(user);
            return ResponseEntity.ok("Visitor Added");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    @PostMapping("/likes")
    public ResponseEntity<String> addLike(@RequestBody Map<String, Integer> reqBody) {
        Integer idLiked = reqBody.get("idLiked");
        Integer idLiker = reqBody.get("idLiker");

        checkAndUpdateMatch(idLiker, idLiked);

        // checkAndUpdateMatch(idLiker, idLiked);

        // checkAndAddMatch(idLiked, idLiker);

        if (idLiked == null || idLiker == null) {
            return ResponseEntity.badRequest().body("Invalid input");
        }

        Optional<Users> likedOpt = userRepo.findById(idLiked);
        Optional<Users> likerOpt = userRepo.findById(idLiker);

        if (likedOpt.isPresent() && likerOpt.isPresent()) {
            Users likedUser = likedOpt.get();
            Users likerUser = likerOpt.get();

            likerUser.addILike(idLiked);
            likedUser.getLikes().add(idLiker);

            userRepo.save(likerUser);
            userRepo.save(likedUser);
            return ResponseEntity.ok("Liked");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody Users updatedUser) {
        if (updatedUser == null || updatedUser.getId() == 0) {
            return ResponseEntity.badRequest().body("Invalid input");
        }

        Optional<Users> userOpt = userRepo.findById(updatedUser.getId());

        if (userOpt.isPresent()) {
            Users existingUser = userOpt.get();
            existingUser.setName(Optional.ofNullable(updatedUser.getName()).orElse(existingUser.getName()));
            existingUser.setFname(Optional.ofNullable(updatedUser.getFname()).orElse(existingUser.getFname()));
            existingUser.setAge(updatedUser.getAge() != 0 ? updatedUser.getAge() : existingUser.getAge());
            existingUser.setPlace(Optional.ofNullable(updatedUser.getPlace()).orElse(existingUser.getPlace()));
            existingUser.setEmail(Optional.ofNullable(updatedUser.getEmail()).orElse(existingUser.getEmail()));
            existingUser.setSexe(Optional.ofNullable(updatedUser.getSexe()).orElse(existingUser.getSexe()));
            existingUser.setPassword(Optional.ofNullable(updatedUser.getPassword()).orElse(existingUser.getPassword()));
            existingUser.setBio(Optional.ofNullable(updatedUser.getBio()).orElse(existingUser.getBio()));
            existingUser.setImage(Optional.ofNullable(updatedUser.getImage()).orElse(existingUser.getImage()));
            existingUser.setTel(Optional.ofNullable(updatedUser.getTel()).orElse(existingUser.getTel()));
            if (updatedUser.getFriends() != null)
                existingUser.setFriends(updatedUser.getFriends());
            if (updatedUser.getHobby() != null)
                existingUser.setHobby(updatedUser.getHobby());
            if (updatedUser.getMatchs() != null)
                existingUser.setMatchs(updatedUser.getMatchs());
            if (updatedUser.getVisitor() != null)
                existingUser.setVisitor(updatedUser.getVisitor());
            if (updatedUser.getLikes() != null)
                existingUser.setLikes(updatedUser.getLikes());
            if (updatedUser.getILikes() != null)
                existingUser.setILikes(updatedUser.getILikes());
            if (updatedUser.getIHates() != null)
                existingUser.setIHates(updatedUser.getIHates());
            if (updatedUser.getNotif() != null)
                existingUser.setNotif(updatedUser.getNotif());

            userRepo.save(existingUser);
            return ResponseEntity.ok("User updated successfully");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    @PostMapping("/hate")
    public ResponseEntity<String> addHate(@RequestBody Map<String, Integer> reqBody) {
        Integer hatedId = reqBody.get("hatedId");
        Integer haterId = reqBody.get("haterId");
        checkAndUpdateMatch(haterId, hatedId);
        // checkAndAddMatch(hatedId, hatedId);

        if (hatedId == null || haterId == null) {
            return ResponseEntity.badRequest().body("Invalid input");
        }

        Optional<Users> hatedOpt = userRepo.findById(hatedId);
        Optional<Users> haterOpt = userRepo.findById(haterId);

        if (hatedOpt.isPresent() && haterOpt.isPresent()) {
            Users hatedUser = hatedOpt.get();
            Users haterUser = haterOpt.get();

            haterUser.addIHate(hatedId);
            hatedUser.getLikes().remove(haterId);

            userRepo.save(haterUser);
            userRepo.save(hatedUser);
            return ResponseEntity.ok("Hated");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    @PostMapping("/notify")
    public ResponseEntity<String> addNotification(@RequestBody Map<String, String> reqBody) {
        String notification = reqBody.get("notif");
        Integer idNotified = Integer.valueOf(reqBody.get("idNotified"));

        if (notification == null || idNotified == null) {
            return ResponseEntity.badRequest().body("Invalid input");
        }

        Optional<Users> notifiedUserOpt = userRepo.findById(idNotified);

        if (notifiedUserOpt.isPresent()) {
            Users notifiedUser = notifiedUserOpt.get();
            if (!notifiedUser.getNotif().contains(notification)) {
                notifiedUser.getNotif().add(notification);
                userRepo.save(notifiedUser);
                return ResponseEntity.ok("Notification added");
            } else {
                return ResponseEntity.ok("Notification already exists");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    @PostMapping("/notify/delete")
    public ResponseEntity<String> deleteNotifications(@RequestBody Map<String, Integer> reqBody) {
        Integer userId = reqBody.get("id");

        if (userId == null) {
            return ResponseEntity.badRequest().body("Invalid input");
        }

        Optional<Users> userOpt = userRepo.findById(userId);

        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            user.getNotif().clear();
            userRepo.save(user);
            return ResponseEntity.ok("All notifications deleted");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

}

