package com.example.backend.entity;

import com.example.backend.userRole.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_table")
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private UserRole role;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false, unique = true)
    private String loginId;

    @Column(nullable = false)
    private String userPassword;

    private String userPasswordCheck;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_prefer_artist")
    @Size(max = 5)
    private List<PreferenceArtist> preferenceArtists = new ArrayList<>();
}
