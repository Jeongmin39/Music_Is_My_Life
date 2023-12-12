package com.example.backend.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import com.example.backend.dto.JoinRequestDTO;
import com.example.backend.dto.LoginRequestDTO;
import com.example.backend.entity.User;
import com.example.backend.token.JwtTokenUtil;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class JwtLoginController {

    private final UserService userService;

    @GetMapping("/jwt/join")
    public String joinPage() {
        return "jwt/join";
    }

    @PostMapping("/jwt/join")
    @ResponseBody
    public String join(@RequestBody JoinRequestDTO joinRequestDTO) {

        // userId 중복 체크
        if (userService.checkUserIdDuplicate(joinRequestDTO.getLoginId())) {
            return "중복인 아이디가 존재합니다.";
        }

        // password와 passwordCheck가 같은지 체크
        if (!joinRequestDTO.getUserPassword().equals(joinRequestDTO.getUserPasswordCheck())) {
            return "비밀번호가 일치하지 않습니다.";
        }

        userService.joinEncode(joinRequestDTO);
        return "success";
    }

    @GetMapping("/jwt/login")
    public String loginPage(Model model) {
        model.addAttribute("loginRequestDTO", new LoginRequestDTO());
        return "";
    }

    @ResponseBody
    @PostMapping("/jwt/login")
    public ResponseEntity<List<String>> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        User user = userService.login(loginRequestDTO);

        // 로그인 아이디나 비밀번호가 틀린 경우 global error return
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        String jwtToken = JwtTokenUtil.createToken(user.getLoginId());
        String userName = user.getUserName();
        List<String> loginInfo = Arrays.asList(userName, jwtToken);
        return ResponseEntity.ok(loginInfo);
    }
}
