package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "diary_table")
public class Diary extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column
    private LocalDate date;

    @Column(nullable = false)
    private String content;
  
    @Column
    private String image;

    @Column
    private String loginId;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "playlist_id")
    @JsonManagedReference
    private Recommendation recommendation;

    public Recommendation getRecommendation() {
        return recommendation;
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }
}

