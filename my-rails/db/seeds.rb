# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
Place.destroy_all
Place.create({name:'Test Name', editorial_summary:'Test summary', lat:-1.09, lng:2.332, photo_reference:'reference', photo:'photo', rating:4.2, user_ratings_total:321})

