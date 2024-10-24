package com.library.repositories;

import com.library.model.Members;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Members, Long> {



    @Procedure(name = "AddNewMember")
    void addNewMember(
            @Param("p_name") String name,
            @Param("p_email") String email,
            @Param("p_membership_date") String membershipDate
    );
}
