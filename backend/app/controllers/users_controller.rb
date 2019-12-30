class UsersController < ApplicationController

    def get_user
        user = User.find_by(username: params[:username])
        render( json: user)
    end
    
end