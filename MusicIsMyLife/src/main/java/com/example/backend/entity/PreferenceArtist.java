package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "preference_artist_table")
public class PreferenceArtist extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String loginId;

    @Column(nullable = false)
    private String artistName;

    @Column
    private String artistImageUrl;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_prefer_artist")
    private List<User> users = new ArrayList<>();
}