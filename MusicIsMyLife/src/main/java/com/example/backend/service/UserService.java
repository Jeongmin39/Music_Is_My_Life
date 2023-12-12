package com.example.backend.service;

import com.example.backend.dto.JoinRequestDTO;
import com.example.backend.dto.LoginRequestDTO;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public boolean checkUserIdDuplicate(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }

    public void joinEncode(JoinRequestDTO joinRequestDTO) {
        userRepository.save(joinRequestDTO.toEntity(passwordEncoder.encode(joinRequestDTO.getUserPassword())));
    }

    public User login(LoginRequestDTO loginRequestDTO) {
        Optional<User> optionalUserEntity = userRepository.findByLoginId(loginRequestDTO.getLoginId());

        if (optionalUserEntity.isEmpty()) {
            System.out.println("empty userEntity");
            return null;
        }

        User user = optionalUserEntity.get();
        System.out.println("given password: " + loginRequestDTO.getUserPassword());
        System.out.println("true password: " + user.getUserPassword());
        if (!passwordEncoder.matches(loginRequestDTO.getUserPassword(), user.getUserPassword())) {
            return null;
        }

        return user;
    }

    public User getLoginUserByLoginId(String loginId) {
        if (loginId == null) return null;

        Optional<User> optionalUserEntity = userRepository.findByLoginId(loginId);
        if (optionalUserEntity.isEmpty()) return null;

        return optionalUserEntity.get();
    }
}
