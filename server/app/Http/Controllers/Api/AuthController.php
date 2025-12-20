<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){
        //Check passed data
        $validate = Validator::make($request->all(),[
            'name'=> ['required','string','max:25'],
            'surname'=> ['required','string','max:25'],
            'username'=>['required','string','max:25','unique:users'],
            'email'=> ['required','string','email','max:255','unique:users,email'],
            'password'=>['required','string','min:6','confirmed'],
            'born_date'=>['required','string','max:10'],
            'role'=>['required','string','in:admin,user']
        ]);

        //if validation fails we return an error
        if($validate->fails()){
            return response()->json([
                'status'=>false,
                'message'=>'Validation error',
                'error'=>$validate->errors()
            ],422);
        }

        //if pass the validation we sotre it
        $data = $validate->validated();

        $user = User::create([
            'name'=>$data['name'],
            'surname'=>$data['surname'],
            'username'=>$data['username'],
            'email'=>$data['email'],
            'password'=>Hash::make($data['password']),
            'born_date'=>$data['born_date']
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'status'=>true,
            'message'=>"New user has been created",
            'token'=>$token,
            'user'=>$user
        ],200);
    }

    public function login(Request $request){

        $validate = Validator::make($request->all(),[
            'login'=>['required','string'],
            'password'=>['required','string','min:6'],
           
        ]);
        $loginWith='';
        $user=null;
        if(filter_var($request->login,FILTER_VALIDATE_EMAIL)){
            $loginWith='email';
              $user = User::where('email',$request->login)->first();
        }else{
            $loginWith='username';
              $user = User::where('username',$request->login)->first();
        }

        if($validate->fails()){
            return response()->json([
                'status'=>false,
                'message'=> "Error Validation login",
                'error'=> $validate->errors()
            ],422);
        }


        if(!$user){
            response()->json([
                'status'=>false,
                'message'=>"User not found"
            ],401);
        }
        if(!Hash::check($request->password,$user->password)){
            return response()->json([
                'status'=>false,
                'message'=> "The password does not match"
            ],400);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'status'=>true,
            'token'=>$token,
            'user'=>[
                'name'=>$user->name,
                'surname'=>$user->surname,
                'username'=>$user->username,
                'email'=>$user->email,
                'born_date'=>$user->born_date,
            ]
        ],200);

    }
public function logout(Request $request)
{
    $user = $request->user();

    if (!$user) {
        return response()->json([
            'status' => false,
            'message' => 'Unauthenticated'
        ], 401);
    }

    $user->tokens()->delete();

    return response()->json([
        'status' => true,
        'message' => 'Logged out successfully'
    ]);
}

}
