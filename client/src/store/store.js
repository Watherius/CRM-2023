import axios from "axios";
import AuthService from "../services/AuthService";
import {makeAutoObservable} from 'mobx';
import {API_URL} from '../api/config';

export default class Store
{
    user = {}
    isAuth = false
    isLoading = false

    constructor()
    {
        makeAutoObservable(this)
    }

    setAuth(bool)
    {
        this.isAuth = bool;
    }

    setUser(user)
    {
        this.user = user;
    }

    setLoading(bool)
    {
        this.isLoading = bool;
    }

    async login(email, password)
    {
        try 
        {
            const response = await AuthService.login(email, password);
            console.log('login: ', response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } 
        catch (error) 
        {
            console.log(error)
        }
    }

    async registration(firstName, secondName, middleName, phone, email, password)
    {
        try 
        {
            const response = await AuthService.registration(firstName, secondName, middleName, phone, email, password);
            console.log('registration: ', response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } 
        catch (error) 
        {
            console.log(error)
        }
    }

    async logout()
    {
        try 
        {
            const response = await AuthService.logout();
            console.log('logout: ', response)
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.setAuth(false);
            this.setUser({});
        } 
        catch (error) 
        {
            console.log(error)
        }
    }

    async checkAuth()
    {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
            console.log('checkAuth: ',response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error)
        } finally {
            this.setLoading(false);
        }
    }
}