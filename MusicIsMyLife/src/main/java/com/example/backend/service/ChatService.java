package com.example.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {

    @Value("${openai.api.key}")
    private String apiKey;
    private final String openaiApiUrl = "https://api.openai.com/v1/chat/completions";

    public String getChatResponse(String question) {

        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        JSONObject requestBodyJson = new JSONObject();
        requestBodyJson.put("model", "gpt-3.5-turbo");

        JSONArray messagesArray = new JSONArray();

        JSONObject systemMessage = new JSONObject();
        systemMessage.put("role", "system");
        systemMessage.put("content", "“You are an intelligent music assistant that extracts keywords from users' diary content and recommends songs based on the emotions users select.”");

        JSONObject userMessage = new JSONObject();
        userMessage.put("role", "user");
        userMessage.put("content", question);

        messagesArray.put(systemMessage);
        messagesArray.put(userMessage);

        requestBodyJson.put("messages", messagesArray);
        String requestBody = requestBodyJson.toString();

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(openaiApiUrl, HttpMethod.POST, entity, String.class);

        // JSON 응답 파싱
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            // content 내용 추출
            String content = jsonNode.get("choices").get(0).get("message").get("content").asText();

            List<String> recommendList = new ArrayList<>();
            String[] temp = content.split("\n");
            for (String sentence : temp) {
                //정규식
                if (sentence.length() > 0 && Character.isDigit(sentence.charAt(0))) {
                    System.out.println(sentence);
                    recommendList.add(sentence);
                }
            }
            return String.join("\n", recommendList);
        } catch (Exception e) {
            return "Error parsing JSON response";
        }
    }
}



