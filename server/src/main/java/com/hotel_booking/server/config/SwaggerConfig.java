package com.hotel_booking.server.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    private static final String SECURITY_SCHEME_NAME = "bearerAuth";

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Hotel Booking API")
                        .version("1.0")
                        .description("REST API documentation for the Hotel Booking system (Customer, Admin, and Receptionist portals)."))
                .components(
                        new Components()
                                .addSecuritySchemes(SECURITY_SCHEME_NAME,
                                        new SecurityScheme()
                                                .name(SECURITY_SCHEME_NAME)
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                )
                );
        // Notice we do NOT attach .addSecurityItem() globally here anymore.
    }

    @Bean
    public OpenApiCustomizer customizeSecurityRequirements() {
        return openApi -> openApi.getPaths().forEach((path, pathItem) -> {
            // Apply the security requirement to all endpoints EXCEPT the public auth ones
            if (!path.startsWith("/api/auth")) {
                pathItem.readOperations().forEach(operation ->
                        operation.addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
                );
            }
        });
    }
}