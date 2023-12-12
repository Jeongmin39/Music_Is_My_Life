package com.example.backend.repository;

import com.example.backend.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {

    @Query("SELECT r FROM Recommendation r JOIN r.diary d WHERE YEAR(d.date) = :year AND MONTH(d.date) = :month AND d.loginId = :loginId")
    List<Recommendation> findAllByDiaryDate(@Param("year") int year, @Param("month") int month, String loginId);

}
