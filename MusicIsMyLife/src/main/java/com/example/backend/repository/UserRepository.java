package com.example.backend.repository;

import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByLoginId(String loginId);
    Optional<User> findByLoginId(String loginId);

    @Query("select p.artistName from PreferenceArtist p where p.loginId = :loginId")
    List<String> findAllPreferenceArtistsByLoginId(String loginId);
}
