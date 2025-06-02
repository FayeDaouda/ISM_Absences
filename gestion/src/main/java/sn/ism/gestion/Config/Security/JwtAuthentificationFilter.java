package sn.dev.suiviabsence.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import sn.ism.gestion.data.repositories.UtilisateurRepository;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthentificationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UtilisateurRepository utilisateurRepository;

//    public JwtAuthentificationFilter(JwtUtils jwtUtils, UserRepository utilisateurRepository) {
//        this.jwtUtils = jwtUtils;
//        this.utilisateurRepository = utilisateurRepository;
//    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String jwt;
        final String userLogin;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        userLogin = jwtUtils.extractUsername(jwt);

        if (userLogin != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = utilisateurRepository.findByLogin(userLogin).orElse(null);

            if (user != null && jwtUtils.isTokenValid(jwt, user)) {
                UserDetailsImpl userDetails = new UserDetailsImpl(user);
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
