Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post('/users', { to: 'users#create' })
  get('/users', { to: 'users#create' })
  post('/user', { to: 'users#get_user' })
  get('/user', { to: 'users#get_user' })
  patch('/user', { to: 'users#update_highscore'})
  

end
