class CreatePlaces < ActiveRecord::Migration[7.0]
  def change
    create_table :places do |t|
      t.string :name
      t.string :editorial_summary
      t.float :lat
      t.float :lng
      t.string :photo_reference
      t.string :photo
      t.float :rating
      t.integer :user_ratings_total

      t.timestamps
    end
  end
end
