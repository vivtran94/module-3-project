class UsersController < ApplicationController

    def get_user
        user = User.find_by(username: params[:username])
        render( json: user)
    end

    def create
        new_user = User.create({
            username: params[:username],
            highscore: 0
        })
        render( json: new_user)

    end

    def update_highscore
        user = User.find_by(username: params[:username])
        user.update({
            highscore: params[:highscore]
        })

    end

end