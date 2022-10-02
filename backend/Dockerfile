FROM python:bullseye
COPY requirements.txt .
COPY pyodbc_wheel .
RUN pip install --upgrade pip
RUN apt update && apt upgrade -y && apt install unixodbc-dev odbcinst -y
RUN pip install -r requirements.txt
RUN odbcinst -i -d -f pyodbc_wheel/linux/odbcinst.ini
COPY . .
EXPOSE 5000
CMD ["python", "main.py"]
