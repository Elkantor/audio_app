const howler = require('howler');
var exports = module.exports = {};

class Node{
    constructor(up, down, left, right){
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
    }
}

exports.Maze = class Maze{

    constructor(begin_node, end_node){
        this.begin_node = begin_node;
        this.end_node = end_node;
        this.nodes = null;
    }

    createMaze(){
        var Nodes = [
            // line 1
            new Node(null, 6, null, 1),
            new Node(null, 7, 0, null),
            new Node(null, 8, null, 3),
            new Node(null, null, 2, 4),
            new Node(null, null, 3, null),
            new Node(null, 11, null, null),
            // line 2
            new Node(0, null, null, null),
            new Node(1, null, null, 8),
            new Node(2, null, 7, 9),
            new Node(null, 15, 8, 10),
            new Node(null, null, 9, null),
            new Node(5, 17, null, null),
            // line 3
            new Node(null, 18, null, null),
            new Node(null, 19, null, 13),
            new Node(null, 20, 13, 15),
            new Node(9, null, 14, null),
            new Node(null, 22, null, 17),
            new Node(11, 23, 16, null),
            // line 4
            new Node(12, null, null, 19),
            new Node(13, null, 18, null),
            new Node(14, 26, null, 21),
            new Node(null, null, 20, null),
            new Node(16, 28, null, null),
            new Node(17, 29, null, null),
            // line 5
            new Node(null, null, null, 25),
            new Node(null, null, 24, 26),
            new Node(20, null, 25, 27),
            new Node(null, null, 26, 28),
            new Node(22, null, 27, null),
            new Node(23, null, null, null)
        ];
        this.nodes = Nodes;
    }

}

var Direction = {
    north: "N",
    south: "S",
    east : "E",
    west: "W"
};

exports.Game = class Game{
    
    constructor(maze){
        this.maze = maze;
        this.win = false;
        this.current_node;
        this.direction = Direction.east;
    }

    step_forward(key){
        switch(key){
            case "ArrowUp":
                this.move("up");
                break;
            case "ArrowDown":
                this.move("down");
                break;
            case "ArrowLeft":
                if(this.direction == Direction.north){
                    this.direction = Direction.west;
                }else if(this.direction == Direction.east){
                    this.direction = Direction.north;
                }else if(this.directon == Direction.south){
                    this.direction = Direction.east;
                }else{
                    this.direction = south;
                }
                break;
            case "ArrowRight": 
                if(this.direction == Direction.north){
                    this.direction = Direction.east;
                }else if(this.direction == Direction.east){
                    this.direction = Direction.south;
                }else if(this.directon == Direction.south){
                    this.direction = Direction.west;
                }else{
                    this.direction = north;
                }
            break;
            default:
                break;
        }
        console.log(this.direction); 
        return false; 
    }

    begin_game(){
        this.current_node = this.maze.nodes[this.maze.begin_node];
        console.log("moved at the node : " + this.maze.nodes.indexOf(this.current_node));
    }

    move(move_direction){
        switch(this.direction){
            case Direction.east:
                if(move_direction == "up"){
                    if(this.current_node.right != null){
                        console.log(this.current_node.right);
                        this.current_node = this.maze.nodes[this.current_node.right];
                    }
                }else{
                    if(this.current_node.right != null){
                        this.current_node = this.maze.nodes[this.current_node.left];
                    }
                }
                break;
            case Direction.south:
                if(move_direction == "up"){
                    if(this.current_node.down != null){
                        this.current_node = this.maze.nodes[this.current_node.down];
                    }
                }else{
                    if(this.current_node.up != null){
                        this.current_node = this.maze.nodes[this.current_node.up];
                    }
                }
                break;
            case Direction.west:
                if(move_direction == "up"){
                    if(this.current_node.left != null){
                        this.current_node = this.maze.nodes[this.current_node.left]
                    }
                }else{
                    if(this.current_node.right != null){
                        this.current_node = this.maze.nodes[this.current_node.right]
                    }
                }
                break;
            
            // by default, the direction is the north
            default:
                if(move_direction == "up"){
                    if(this.current_node.up != null){
                        this.current_node = this.maze.nodes[this.current_node.up]
                    }
                }else{
                    if(this.current_node.down != null){
                        this.current_node = this.maze.nodes[this.current_node.down]
                    }
                }           
                break;
        }
        console.log('moved to ' + this.maze.nodes.indexOf(this.current_node));
    }
}