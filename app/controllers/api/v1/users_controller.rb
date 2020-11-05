module Api
  module V1
    class UsersController < ApplicationController
      # I made this index method just for this example
      # In a real app I would use a repository or search helper class to do all filtering/pagination
      def index
        @users = User.all

        sort = %w[last_name first_name].include?(params[:sort]) ? params[:sort] : 'last_name'
        direction = %w[asc desc].include?(params[:direction]) ? params[:direction] : 'asc'

        @users = @users.order("#{sort} #{direction}")
        @users = @users.page(params[:page] || 1).per(params[:per_page] || 10)

        render json: @users, meta: { total_pages: @users.total_pages }
      end
    end
  end
end
