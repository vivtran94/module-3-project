class CreateUser < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.integer :highscore
    end
  end
end
