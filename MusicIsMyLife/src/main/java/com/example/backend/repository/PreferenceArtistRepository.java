package com.example.backend.repository;

import com.example.backend.entity.PreferenceArtist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PreferenceArtistRepository extends JpaRepository<PreferenceArtist, Long> {

    @Query("select p.artistName , p.artistImageUrl, p.id from PreferenceArtist p where p.loginId = :loginId")
    List<String> findNamesByLoginId(String loginId);

}
