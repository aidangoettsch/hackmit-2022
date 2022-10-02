FROM python:bullseye
COPY . .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN apt update && apt install odbcinst -y
RUN odbcinst -i -d -f pyodbc_wheel/linux/odbcinst.ini
EXPOSE 5000
CMD ["python", "main.py"]