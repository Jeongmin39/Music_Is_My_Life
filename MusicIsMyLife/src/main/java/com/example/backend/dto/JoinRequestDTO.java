package com.example.backend.dto;

import com.example.backend.entity.User;
import com.example.backend.userRole.UserRole;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class JoinRequestDTO {

    @NotBlank(message = "사용자 이름이 비어있습니다.")
    private String userName;

    @NotBlank(message = "로그인 아이디가 비어있습니다.")
    private String loginId;

    @NotBlank(message = "비밀번호가 비어있습니다.")
    private String userPassword;
    private String userPasswordCheck;

    public User toEntity(String encodedPassword) {
        return User.builder()
                .userName(this.userName)
                .loginId(this.loginId)
                .userPassword(encodedPassword)
                .role(UserRole.USER)
                .build();
    }
}

