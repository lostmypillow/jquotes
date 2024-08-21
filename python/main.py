import json
import math

def split_json(input_file, output_prefix, num_files):
    # Load the data from the input JSON file
    with open(input_file, 'r') as file:
        data = json.load(file)
    
    # Calculate the number of objects per file
    total_objects = len(data)
    print(len(data))
    # objects_per_file = math.ceil(total_objects / num_files)
    
    # # Split the data into multiple parts
    # for i in range(num_files):
    #     start_index = i * objects_per_file
    #     end_index = start_index + objects_per_file
    #     split_data = data[start_index:end_index]
        
    #     # Create a new JSON file for each split
    #     output_file = f"{output_prefix}_part{i+1}.json"
    #     with open(output_file, 'w') as outfile:
    #         json.dump(split_data, outfile, indent=4)
        
    #     print(f"Created {output_file} with {len(split_data)} objects.")

# Example usage
input_file = 'python\data.json'  # Your large JSON file
output_prefix = 'split_data'    # Prefix for the output files
num_files = 6                   # Number of files to split into

split_json(input_file, output_prefix, num_files)
# print("test")