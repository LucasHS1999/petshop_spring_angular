package br.com.projeto.api.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenAPIConfiguration {

    @Bean
    public OpenAPI defineOpenAPI() {

        Server server = new Server();
        server.setUrl("http://localhost:8080");
        server.setDescription("Development");

        Contact myContact = new Contact();
        myContact.setName("Pet Shop");
        myContact.setEmail("pet@teste.com.br");

        Info information = new Info()
                .title("PET SHOP - DOCUMENTATION API")
                .version("0.0.1")
                .description("This API exposes endpoints to manage the pet shop functions.")
                .contact(myContact);

        return new OpenAPI().info(information).servers(List.of(server));
    }
}
