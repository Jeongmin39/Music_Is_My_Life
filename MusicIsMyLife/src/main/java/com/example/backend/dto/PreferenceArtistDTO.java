package com.example.backend.dto;

import com.example.backend.entity.PreferenceArtist;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PreferenceArtistDTO {

    private String artistName;
    private String artistImageUrl;

    public PreferenceArtist toEntity() {
        return PreferenceArtist.builder()
                .artistName(this.artistName)
                .build();
    }
}

