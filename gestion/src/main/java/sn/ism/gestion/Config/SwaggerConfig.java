package sn.ism.gestion.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

    @Value("${spring.application.version}")
    private String version;

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI().info(new Info()
                .title("Gestion absence")
                .version(version)
                .description("Gestion absence"));
    }
    
}
