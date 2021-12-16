import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EmailValidator } from "@angular/forms";

interface authResponseData{
    token: string,
    status: string,
    data: user
}
interface user{
    name: string,
    email: string,
    _id:string
}
@Injectable({providedIn:'root'})
export class AuthService{
    constructor(private http:HttpClient){}
    signUp(name: string,email: string, password: string, ) {
        console.log(" email:", email, "name ", name, "passwod ", password);
        return this.http.post<authResponseData>('http://localhost:3000/api/v1/signUp',
            {
                name: name,
                email: email,
                password: password,
                passwordConfirm: password
            })
    }

}