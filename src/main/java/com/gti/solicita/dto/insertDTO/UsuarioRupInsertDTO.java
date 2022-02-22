package com.gti.solicita.dto.insertDTO;

import com.gti.solicita.dto.UsuarioRupDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioRupInsertDTO extends UsuarioRupDTO {
    private String senha;

    UsuarioRupInsertDTO() {
        super();
    }

}
