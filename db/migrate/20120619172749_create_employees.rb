class CreateEmployees < ActiveRecord::Migration
  def change
    create_table :employees do |t|
      t.string :first_name
      t.string :surname
      t.date :date_of_birth
      t.integer :salary

      t.timestamps
    end
  end
end
