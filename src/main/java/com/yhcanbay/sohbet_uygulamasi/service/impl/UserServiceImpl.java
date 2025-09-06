package com.yhcanbay.sohbet_uygulamasi.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yhcanbay.sohbet_uygulamasi.dto.DtoUser;
import com.yhcanbay.sohbet_uygulamasi.entities.User;
import com.yhcanbay.sohbet_uygulamasi.repository.IUserRepository;
import com.yhcanbay.sohbet_uygulamasi.service.IUserService;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    IUserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public DtoUser createUser(DtoUser user) {
        User newUser = new User();

        BeanUtils.copyProperties(user, newUser);
        newUser.setAvatar_id(6);

        userRepository.save(newUser);

        return user;
    }

    @Override
    public DtoUser getOneUser(Long id) {

        Optional<User> optional = userRepository.findById(id);

        if(optional.isPresent()){
            DtoUser dtoUser = new DtoUser();
            User user = optional.get();

            BeanUtils.copyProperties(user, dtoUser);

            return dtoUser;
        }

        return null;
    }

    @Override
    public DtoUser updateOneUser(Long id, DtoUser dtoUser) {
        Optional<User> optional = userRepository.findById(id);

        if(optional.isPresent()){
            User user = optional.get();
            
            user.setAvatar_id(dtoUser.getAvatar_id());
            user.setUserName(dtoUser.getUserName());

            userRepository.save(user);

            return dtoUser;
        }

        return null;
    }    

    @Override
    public DtoUser deleteOneUser(Long id) {
        Optional<User> optional = userRepository.findById(id);

        if(optional.isPresent()){
            User user = optional.get();
            DtoUser dto = new DtoUser();

            BeanUtils.copyProperties(user, dto);
        
            userRepository.delete(user);

            return dto;
        }

        return null;
    }

    public User findByUsername(String userName) {
        User user = userRepository.findByUserName(userName);
        return user;
    }

}
