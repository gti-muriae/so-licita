package com.gti.solicita.dto.insertDTO;

import com.gti.solicita.dto.AdminRupDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminRupInsertDTO extends AdminRupDTO {
    private String senha;

    AdminRupInsertDTO() {
        super();
    }

}
