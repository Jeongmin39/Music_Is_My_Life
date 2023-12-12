package com.example.backend.service;

import com.example.backend.entity.PreferenceArtist;
import com.example.backend.repository.PreferenceArtistRepository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PreferenceArtistService {

    private final PreferenceArtistRepository preferenceArtistRepository;

    @Autowired
    public PreferenceArtistService(PreferenceArtistRepository preferenceArtistRepository) {
        this.preferenceArtistRepository = preferenceArtistRepository;
    }

    public void savePreferenceArtist(PreferenceArtist preferenceArtist) {
        preferenceArtistRepository.save(preferenceArtist);
    }

    @Transactional
    public void deletePreference(Long id) {
        preferenceArtistRepository.deleteById(id);
    }
}