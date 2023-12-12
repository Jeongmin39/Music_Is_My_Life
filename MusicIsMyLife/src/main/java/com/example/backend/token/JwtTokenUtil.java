package com.example.backend.token;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Date;

public class JwtTokenUtil {

    @Value("${jwt.secret}")
    private static String secretKey;
    //JWT Token 생성
    public static String createToken(String loginId) {
        Claims claims = Jwts.claims().setSubject(loginId); //JWT payload에 저장되는 정보 단위
        //claims.put("userId", userId);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) //Token 유효시간 60분
                .signWith(SignatureAlgorithm.HS256, "${jwt.secret}")
                .compact();
    }

    public static boolean isExpired(String token, String secretKey) {
        Date expiredDate = extractClaims(token, secretKey).getExpiration();
        return expiredDate.before(new Date());
    }

    private static Claims extractClaims(String token, String secretKey) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    // 헤더에서 jwt 추출
    public static String getJwt() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        return request.getHeader("Authorization");
    }

    public static String getLoginId()  {
        String accessToken = getJwt();

        Jws<Claims> claims;
        claims = Jwts.parser()
                    .setSigningKey("${jwt.secret}")
                    .parseClaimsJws(accessToken);

        return claims.getBody().get("sub", String.class);
    }
}