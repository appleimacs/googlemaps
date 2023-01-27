require 'dotenv-rails'
require 'net/http'
require 'uri'
require 'json'

Dotenv.load

class Api::V1::PlacesController < ApplicationController
    def index
        lng = params[:lng]
        lat = params[:lat]
        url = URI("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=#{lat}%2C#{lng}&radius=1500&type=restaurant&key=#{ENV['API_KEY']}&keyword=#{params[:keyword]}")

        https = Net::HTTP.new(url.host, url.port)
        https.use_ssl = true

        request = Net::HTTP::Get.new(url)

        response = https.request(request)
        parsed_response = JSON.parse(response.read_body)
        parsed_response['results'].each do |item| 
            if item['photos'] 
                item['photo_reference'] = item['photos'][0]['photo_reference'] 
            end
            item['photo'] = getPhoto(item['photo_reference'])['location']
        end
        render json: parsed_response['results']
    end

    def getPhoto reference
        url = URI("https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=640&photoreference=#{reference}&key=#{ENV['API_KEY']}")

        https = Net::HTTP.new(url.host, url.port)
        https.use_ssl = true

        request = Net::HTTP::Get.new(url)

        response = https.request(request)
        return response
    end
end
