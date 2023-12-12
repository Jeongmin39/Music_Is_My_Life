package com.example.backend.service;

import com.example.backend.entity.Recommendation;
import com.example.backend.repository.RecommendationRepository;
import org.springframework.stereotype.Service;

@Service
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;

    public RecommendationService(RecommendationRepository recommendationRepository) {
        this.recommendationRepository = recommendationRepository;
    }

    public Long saveRecommendation(Recommendation recommendation) {
        Recommendation savedRecommendation = recommendationRepository.save(recommendation);
        return savedRecommendation.getId();
    }
}
