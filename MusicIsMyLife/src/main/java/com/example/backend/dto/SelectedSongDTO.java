package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class SelectedSongDTO {

    private LocalDate date;
    private String selectedArtistName;
    private String selectedSongName;
    private String albumImageUrl;
    private String songUri;

}

