from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to your MySQL database
def connect_to_database():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="pets"
    )

# Route to fetch all dogs
@app.route('/dogs', methods=['GET'])
def get_dogs():
    try:
        connection = connect_to_database()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM dogs_available, dog_details where dogs_available.dog_id=dog_details.dog_id"
        cursor.execute(query)
        dogs = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(dogs)
    except Exception as e:
        return jsonify({"error": str(e)})

# Route to fetch a specific dog by ID
@app.route('/dogs/<int:dog_id>', methods=['GET'])
def get_dog(dog_id):
    try:
        connection = connect_to_database()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM dog WHERE dog_id = %s"
        cursor.execute(query, (dog_id,))
        dog = cursor.fetchone()
        cursor.close()
        connection.close()
        return jsonify(dog)
    except Exception as e:
        return jsonify({"error": str(e)})

# Route to add a new dog
@app.route('/dogs', methods=['POST'])
def add_dog():
    try:
        data = request.json
        connection = connect_to_database()
        cursor = connection.cursor()
        query = "INSERT INTO dog (dog_name, age, vaccination_status, breed_id) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (data['dog_name'], data['age'], data['vaccination_status'], data['breed_id']))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Dog added successfully"})
    except Exception as e:
        return jsonify({"error": str(e)})

# Route to update an existing dog
@app.route('/dogs/<int:dog_id>', methods=['PUT'])
def update_dog(dog_id):
    try:
        data = request.json
        connection = connect_to_database()
        cursor = connection.cursor()
        query = "UPDATE dog SET dog_name = %s, age = %s, vaccination_status = %s, breed_id = %s WHERE dog_id = %s"
        cursor.execute(query, (data['dog_name'], data['age'], data['vaccination_status'], data['breed_id'], dog_id))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Dog updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)})

# Route to delete a dog
@app.route('/dogs/<int:dog_id>', methods=['DELETE'])
def delete_dog(dog_id):
    try:
        connection = connect_to_database()
        cursor = connection.cursor()
        query = "DELETE FROM dog WHERE dog_id = %s"
        cursor.execute(query, (dog_id,))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Dog deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)})
    
@app.route('/adopter_login', methods=['POST'])
def adopter_login():
    connection = connect_to_database()
    cursor = connection.cursor()
    data = request.json
    print("Login Data Received:", data)
    
    # Extract user ID and password from request data
    user_id = data.get('userid')
    password = data.get('password')
    
    # Query the database to check if the user exists and the password matches
    # Replace the following query with your database query logic
    query = "SELECT * FROM adopter WHERE user_id = %s AND password = %s"
    cursor.execute(query, (user_id, password))
    user_query = cursor.fetchone()
    
    if user_query:
        # User exists and password matches, return adopter details
        adopter_details = {
            'userid': user_query[0],
            'fullname': user_query[1],
            'address': user_query[2],
            'dob': str(user_query[3]),  # Convert date to string
            'income': user_query[4],
        }
        connection.close()  # Close the connection after use
        return jsonify({'message': 'Login successful', 'adopter_details': adopter_details})
    else:
        # User does not exist or password does not match, return 401 unauthorized
        connection.close()  # Close the connection after use
        abort(401)




@app.route('/adopter_register', methods=['POST'])
def adopter_register():
    # Connect to the database
    connection = connect_to_database()

    try:
        # Get JSON data from request
        data = request.json
        print("Registration Data Received:", data)

        # Extract values from JSON data
        userid = data.get('userid')
        fullname = data.get('fullname')
        address = data.get('address')
        dob = data.get('dob')
        income = int(data.get('income'))
        password = data.get('password')

        # Insert data into the adopter table
        with connection.cursor() as cursor:
            sql = "INSERT INTO adopter (user_id, name, address, DOB, income_range, phone_no, password) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (userid, fullname, address, dob, income, '', password))
            connection.commit()

        # Close the database connection
        connection.close()
    
        # Return success message
        return jsonify({'message': 'Registration successful'})
    
    except Exception as e:
        # Log any errors
        print("Error:", e)
        return jsonify({'message': 'Registration failed'}), 500
    
@app.route('/shelter_login', methods=['POST'])
def shelter_login():
    data = request.json
    print("Shelter Login Data Received:", data)
    # You can perform authentication logic here
    return jsonify({'message': 'Login successful'})

@app.route('/shelter_register', methods=['POST'])
def shelter_register():
    # Connect to the database
    connection = connect_to_database()

    try:
        # Get JSON data from request
        data = request.json
        print("Shelter Registration Data Received:", data)

        # Extract values from JSON data
        shelterid = data.get('shelterid')
        sheltername = data.get('sheltername')
        address = data.get('address')
        phone1 = data.get('phone1')
        phone2 = data.get('phone2')
        capacity = int(data.get('capacity'))
        opening = data.get('opening')
        closing = data.get('closing')
        password = data.get('password')

        # Insert data into the shelter table
        with connection.cursor() as cursor:
            sql = "INSERT INTO shelter (shelter_id, shelter_name, password, location, phone_no1, phone_no2, capacity, opening_time, closing_time) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (shelterid, sheltername,password, address, phone1, phone2, capacity, opening, closing))
            connection.commit()

        # Close the database connection
        connection.close()

        # Return success message
        return jsonify({'message': 'Registration successful'})
    
    except Exception as e:
        # Log any errors
        print("Error:", e)
        return jsonify({'message': 'Registration failed'}), 500
    
@app.route('/breed_details', methods=['GET'])
def get_breed_details():
    try:
        # Connect to the database
        connection = connect_to_database()

        # Extract breed name from request parameters
        breed_name = request.args.get('breed_name')

        # Query to retrieve breed details
        with connection.cursor() as cursor:
            sql = "SELECT * FROM breed WHERE breed_name = %s"
            cursor.execute(sql, (breed_name,))
            breed_details = cursor.fetchone()

        # Close the database connection
        connection.close()

        if breed_details:
            return jsonify(breed_details)
        else:
            return jsonify({'message': 'Breed not found'}), 404

    except Exception as e:
        # Log any errors
        print("Error:", e)
        return jsonify({'message': 'Failed to get breed details'}), 500

if __name__ == '__main__':
    app.run(debug=True)
