FROM python:bullseye
COPY . .
RUN pip install --upgrade pip
RUN apt update && apt upgrade -y && apt install unixodbc-dev odbcinst -y
RUN pip install -r requirements.txt
RUN odbcinst -i -d -f pyodbc_wheel/linux/odbcinst.ini
EXPOSE 5000
CMD ["python", "main.py"]
