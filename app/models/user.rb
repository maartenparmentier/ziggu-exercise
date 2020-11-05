# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  avatar_url :string
#  email      :string           not null
#  first_name :string           not null
#  last_name  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class User < ApplicationRecord
end
