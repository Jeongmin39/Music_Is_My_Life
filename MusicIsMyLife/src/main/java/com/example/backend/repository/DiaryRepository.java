package com.example.backend.repository;

import com.example.backend.entity.Diary;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DiaryRepository extends JpaRepository<Diary, Long> {

    @Query("SELECT DISTINCT d.date FROM Diary d WHERE d.loginId = :loginId")
    List<LocalDate> findDatesWithDiary(String loginId);

    @Query("SELECT DISTINCT YEAR(d.date) AS year, MONTH(d.date) AS month FROM Diary d")
    List<Object[]> findYearsAndMonthsWithDiary();

    // 년도만 추출
    @Query("SELECT DISTINCT YEAR(d.date) AS year FROM Diary d WHERE d.loginId = :loginId")
    List<Integer> findYearsWithDiary(String loginId);

    // 월만 추출
    @Query("SELECT DISTINCT MONTH(d.date) AS month FROM Diary d WHERE d.loginId = :loginId")
    List<Integer> findMonthsWithDiary(String loginId);

    // 특정 날짜, 사용자에 해당하는 일기 조회
    @Query("SELECT d FROM Diary d WHERE d.date = :date AND d.loginId = :loginId")
    Optional<Diary> findByDateAndUser(LocalDate date, String loginId);

    @Query("SELECT d FROM Diary d WHERE d.loginId = :loginId ORDER BY d.date DESC")
    List<Diary> findAllByOrderByDateDesc(String loginId, Pageable page);

    @Query("SELECT d FROM Diary d WHERE d.loginId = :loginId AND d.date < :date ORDER BY d.date DESC")
    List<Diary> findByDateBeforeOrderByDateDesc(LocalDate date, String loginId, Pageable page);
    @Query("SELECT CASE WHEN COUNT(d) > 0 THEN true ELSE false END FROM Diary d WHERE d.loginId = :loginId AND d.date < :date")
    Boolean existsByDateBefore(LocalDate date, String loginId);
}