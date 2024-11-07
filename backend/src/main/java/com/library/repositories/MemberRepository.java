package com.library.repositories;

import com.library.model.Members;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;

@Repository
public interface MemberRepository extends JpaRepository<Members, Long> {



    @Procedure(name = "AddNewMember")
    void addNewMember(
            @Param("p_first_name") String firstName,
            @Param("p_last_name") String lastName,
            @Param("p_date_of_birth") Date dateOfBirth,
            @Param("p_email") String email,
            @Param("p_phone") String phone
    );
}
