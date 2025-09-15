package com.yhcanbay.sohbet_uygulamasi.service;

import java.util.List;

import com.yhcanbay.sohbet_uygulamasi.dto.DtoComment;
import com.yhcanbay.sohbet_uygulamasi.dto.DtoUser;
import com.yhcanbay.sohbet_uygulamasi.entities.User;

public interface IUserService {
    public List<User> getAllUsers(); 

    public DtoUser createUser(DtoUser user);

    public DtoUser getOneUser(Long id);

    public DtoUser updateOneUser(Long id, DtoUser dtoUser);

    public DtoUser deleteOneUser(Long id);

    User findByUsername(String userName);

    List<DtoComment> getUserActivities(Long userId);
    
}
