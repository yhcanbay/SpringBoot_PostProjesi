package com.yhcanbay.sohbet_uygulamasi.controller;

import java.util.List;

import com.yhcanbay.sohbet_uygulamasi.dto.DtoUser;
import com.yhcanbay.sohbet_uygulamasi.entities.User;

public interface IUserController {

    public List<User> getAllUsers();

    public DtoUser createUser(DtoUser user);

    public DtoUser getOneUser(Long id);
    
    public DtoUser updateOneUser(Long id, DtoUser dtoUser);

    public DtoUser deleteOneUser(Long id);

}
