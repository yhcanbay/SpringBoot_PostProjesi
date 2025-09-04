package com.yhcanbay.sohbet_uygulamasi.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yhcanbay.sohbet_uygulamasi.controller.IUserController;
import com.yhcanbay.sohbet_uygulamasi.dto.DtoUser;
import com.yhcanbay.sohbet_uygulamasi.entities.User;
import com.yhcanbay.sohbet_uygulamasi.service.impl.UserServiceImpl;

@RestController
@RequestMapping("/users")
public class UserControllerImpl implements IUserController {

    @Autowired
    UserServiceImpl userService;

    @Override
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @Override
    @PostMapping()
    public DtoUser createUser(@RequestBody DtoUser user) {
        return userService.createUser(user);
    }

    @GetMapping(path = "/{userid}")
    @Override
    public DtoUser getOneUser(@PathVariable Long userid) {
        return userService.getOneUser(userid);
    }

    @PutMapping(path = "/{userid}")
    @Override
    public DtoUser updateOneUser(@PathVariable Long userid,@RequestBody DtoUser dtoUser) {
        return userService.updateOneUser(userid, dtoUser);    
    }

    @DeleteMapping(path = "/{userid}")
    @Override
    public DtoUser deleteOneUser(@PathVariable Long userid) {
        return userService.deleteOneUser(userid);
    }

    @PutMapping(path = "/avatar/{id}")
    @Override
    public int setAvatarById(@PathVariable Long userId,@RequestParam int avatar){
        return userService.setAvatarById(userId,avatar);
    }

}
