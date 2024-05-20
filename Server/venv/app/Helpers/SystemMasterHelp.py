from flask import jsonify
from app import app, db 
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text

@app.route('/api/task-master/system_master_help', methods=['GET'])
def system_master():
    try:
        # Start a database transaction
        with db.session.begin_nested():
            query = db.session.execute(text('''
               select System_Code as Category_Code,System_Name_E as Category_Name from nt_1_systemmaster where System_Type = 'T' and Company_Code=4;
            '''))

            result = query.fetchall()

        response = []
        for row in result:
            response.append({
                'Category_Code': row.Category_Code,
                'Category_Name': row.Category_Name,
            })

        return jsonify(response)

    except SQLAlchemyError as error:
        # Handle database errors
        print("Error fetching data:", error)
        db.session.rollback()
        return jsonify({'error': 'Internal server error'}), 500


