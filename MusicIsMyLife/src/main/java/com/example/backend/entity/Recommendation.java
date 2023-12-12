package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "playlist_table")
public class Recommendation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String selectedArtistName;
    @Column
    private String selectedSongName;
    @Column
    private String albumImageUrl;
    @Column
    private String songUri;

    @OneToOne(mappedBy = "recommendation", cascade = CascadeType.ALL)
    @JsonBackReference
    private Diary diary;
}
