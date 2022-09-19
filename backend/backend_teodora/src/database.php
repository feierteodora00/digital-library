<?php

/**
 * Connect to a SQLite db
 * 
 * @author Teodora Feier w19006590
 * 
 */

class Database
{
    private $dbConnection;

    /**
     * Constructor that accepts $dbName parameter and sets the connection
     */

    public function __construct($dbName, $username, $password){
        $this->setDbConnection($dbName, $username, $password);
    }

    /**
     * Make a connection to an sqlite db or throw exception
     */
    private function setDbConnection($dbName, $username, $password){
        try {
            $this->dbConnection = new PDO('mysql:host=localhost;dbname='.$dbName, $username, $password);
            $this->dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Database Connection Error: " . $e->getMessage();
            exit();
        }
    }

    /**
     * Execute an sql prepared statement
     * 
     * @param   string  $sql    An sql statement
     * @param   array   $params An associative array of parameters (default empty array)
     * @return  array           An associative array of the query results
     */

    public function executeSQL($sql, $params=[]){
        $stmt = $this->dbConnection->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}