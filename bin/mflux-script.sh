#!/bin/bash

# Default values
model="schnell"
steps=3  # Changed default to 3 steps
quality=4
seed=""
output=""  # Initialize output as empty, we'll set it later
metadata="--metadata"
use_imageplus=false
multi_steps=""  # New variable for multiple step counts
multi_steps_values="1,2,4"  # Default values for multi-steps mode
multi_seeds=""  # New variable for multiple seed runs
# Generate distinct filename if not provided
timestamp=$(date +"%Y%m%d_%H%M%S")

output_dir="src/content/fluximages/${timestamp}"  # Define the output directory

# Default dimensions (square)
width=1024
height=1024

print_help() {
    echo "MFlux Generator Script"
    echo "Usage: ./mflux-script.sh [options]"
    echo ""
    echo "Options:"
    echo "  -p, --prompt TEXT       The prompt to use (required)"
    echo "  -m, --model NAME        Model to use (default: schnell, options: schnell, dev)"
    echo "  -s, --steps NUMBER      Number of steps (default: 3)"
    echo "  -S, --multi-steps       Run multiple step counts (default: 1,2,4)
  -M, --steps-list LIST   Custom list of step counts, comma-separated (e.g. "5,10,20,40")
  -R, --random-seeds NUM  Generate multiple images with random seeds (e.g. "10" for 10 seeds)
  -D, --seed-list LIST    Custom list of seeds, comma-separated (e.g. "123,456,789")"
    echo "  -q, --quality NUMBER    Quality setting (default: 4)"
    echo "  -d, --seed NUMBER       Seed for reproducibility"
    echo "  -o, --output FILENAME   Output filename (optional, auto-generated if not specified)"
    echo "  # Metadata is now always included"
    echo "  -i, --imageplus         Use ollama imageplus to enhance the prompt"
    echo "  --portrait             Use portrait mode (1024x1536, 2:3 ratio)"
    echo "  --landscape           Use landscape mode (1024x576, 16:9 ratio)"
    echo "  --landscape-lg        Use large landscape mode (1536x864, 16:9 ratio)"
    echo "  -h, --help              Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./mflux-script.sh --prompt \"oilpainting of a castle with lots of texture\""
    echo "  ./mflux-script.sh -p \"dreamy landscape\" -m dev -s 20 -q 5 -o dream.png"
    echo "  ./mflux-script.sh -p \"abstract art\" -S -m dev -q 5  # Run default multi-steps (1,2,4)
  ./mflux-script.sh -p \"landscape\" -M \"5,10,20,40\" -q 5  # Run custom step counts
  ./mflux-script.sh -p \"portrait\" -R 5  # Generate 5 images with random seeds
  ./mflux-script.sh -p \"castle\" -D \"42,123,777\" -s 3  # Use specific seeds
  ./mflux-script.sh -p \"tall building\" --portrait  # Generate portrait image
  ./mflux-script.sh -p \"wide scene\" --landscape  # Generate landscape image
  ./mflux-script.sh -p \"panorama\" --landscape-lg  # Generate large landscape image"
    exit 1
}

# Check if no arguments were provided
if [ $# -eq 0 ]; then
    print_help
fi

# Parse arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
        -p|--prompt)
            prompt="$2"
            shift 2
            ;;
        -m|--model)
            model="$2"
            shift 2
            ;;
        -s|--steps)
            steps="$2"
            shift 2
            ;;
        -q|--quality)
            quality="$2"
            shift 2
            ;;
        -d|--seed)
            seed="$2"
            shift 2
            ;;
        -o|--output)
            output="$2"
            shift 2
            ;;
        -S|--multi-steps)
            multi_steps="$multi_steps_values"
            shift
            ;;
        -M|--steps-list)
            multi_steps="$2"
            shift 2
            ;;
        -R|--random-seeds)
            # Generate a list of random seeds
            num_seeds=$2
            for i in $(seq 1 $num_seeds); do
                # Generate a random number between 1 and 999999
                random_seed=$((RANDOM * 1000 + RANDOM))
                if [ -z "$multi_seeds" ]; then
                    multi_seeds="$random_seed"
                else
                    multi_seeds="$multi_seeds,$random_seed"
                fi
            done
            shift 2
            ;;
        -D|--seed-list)
            multi_seeds="$2"
            shift 2
            ;;
        --portrait)
            width=1024
            height=1536
            shift
            ;;
        --landscape)
            width=1024
            height=576
            shift
            ;;
        --landscape-lg)
            width=1536
            height=864
            shift
            ;;
        # Removed metadata option as it's now always included
        -i|--imageplus)
            use_imageplus=true
            shift
            ;;
        -h|--help)
            print_help
            ;;
        *)
            echo "Unknown option: $1"
            print_help
            ;;
    esac
done

# Check if prompt is provided
if [ -z "$prompt" ]; then
    echo "Error: Prompt is required"
    print_help
fi

# Create the output directory if it doesn't exist
mkdir -p "$output_dir"
echo "Images will be saved to: $output_dir"

# Take first 5 words of prompt and replace spaces with underscores
prompt_part=$(echo "$prompt" | awk '{for(i=1;i<=5 && i<=NF;i++) printf "%s_", $i; print ""}' | sed 's/_$//')
# Limit prompt part to 30 characters to avoid too long filenames
prompt_part="${prompt_part:0:30}"
# Combine them
if [ "$output" = "" ]; then
    filename="${timestamp}_${prompt_part}.png"
    output="${output_dir}/${filename}"
    # Remove any special characters that might cause issues in filenames
    output=$(echo "$output" | sed 's/[^a-zA-Z0-9_.-/]/_/g')
    filename=$(echo "$filename" | sed 's/[^a-zA-Z0-9_.-]/_/g')
else
    # If output was specified, prepend the directory
    filename="$output"
    output="${output_dir}/${output}"
fi

# Prepare the command
if [ "$use_imageplus" = true ]; then
    enhanced_prompt=$(ollama run imageplus "$prompt")
    command="mflux-generate --model $model --prompt \"$enhanced_prompt\" --steps $steps -q $quality --width $width --height $height"
else
    command="mflux-generate --model $model --prompt \"$prompt\" --steps $steps -q $quality --width $width --height $height"
fi

# Add optional parameters
if [ ! -z "$seed" ]; then
    command="$command --seed $seed"
fi

# Always add metadata
command="$command $metadata"

command="$command --output $output"

# Show the command
echo "Executing: $command"

# Handle multi-seed generation if requested
if [ ! -z "$multi_seeds" ]; then
    log_file="${output_dir}/seeds.csv"
    echo "seed,duration_seconds,filename,timestamp,model,quality,steps,prompt" > "$log_file"
    echo "Recording seed variations in: seeds.csv"
    
    # Set steps to 1 for random seed generation
    steps=1
    
    # Run for each seed in the multi_seeds list
    IFS=',' read -ra SEED_VALUES <<< "$multi_seeds"
    for seed_value in "${SEED_VALUES[@]}"; do
        # Generate distinct filename for this seed
        timestamp=$(date +"%Y%m%d_%H%M%S")
        prompt_part=$(echo "$prompt" | awk '{for(i=1;i<=5 && i<=NF;i++) printf "%s_", $i; print ""}' | sed 's/_$//')
        prompt_part="${prompt_part:0:30}"
        filename="${timestamp}_seed${seed_value}_${prompt_part}.png"
        seed_output="${output_dir}/${filename}"
        seed_output=$(echo "$seed_output" | sed 's/[^a-zA-Z0-9_.-/]/_/g')
        filename=$(echo "$filename" | sed 's/[^a-zA-Z0-9_.-]/_/g')
        
        # Build the command with this seed
        if [ "$use_imageplus" = true ]; then
            enhanced_prompt=$(ollama run imageplus "$prompt")
            seed_command="mflux-generate --model $model --prompt \"$enhanced_prompt\" --steps $steps -q $quality --seed $seed_value --width $width --height $height"
        else
            seed_command="mflux-generate --model $model --prompt \"$prompt\" --steps $steps -q $quality --seed $seed_value --width $width --height $height"
        fi
        seed_command="$seed_command $metadata --output $seed_output"
        
        echo ""
        echo "===== Running with seed $seed_value (1 step) ====="
        echo "Executing: $seed_command"
        
        # Execute the command and time it
        echo "Starting generation at $(date +"%H:%M:%S")"
        start_time=$(date +%s)
        eval $seed_command
        end_time=$(date +%s)
        duration=$((end_time - start_time))
        current_timestamp=$(date +"%Y-%m-%d %H:%M:%S")
        echo "Generation completed in ${duration} seconds ($(date +"%H:%M:%S"))"
        echo "Generated image saved as: $filename"
        
        # Record the timing data
        if [ "$use_imageplus" = true ]; then
            # Store the enhanced prompt in the log for imageplus
            echo "$seed_value,$duration,$filename,$current_timestamp,$model,$quality,$steps,\"$enhanced_prompt\"" >> "$log_file"
        else
            echo "$seed_value,$duration,$filename,$current_timestamp,$model,$quality,$steps,\"$prompt\"" >> "$log_file"
        fi
        
        # Open the image
        open "$seed_output" 2>/dev/null || echo "Could not open image. You may need to view it manually."
    done
    
    echo ""
    echo "All seed variations completed. Data saved to seeds.csv"
    exit 0
fi

# Create a log file for the timing data if running multi-steps
if [ ! -z "$multi_steps" ]; then
    log_file="${output_dir}/steps.csv"
    echo "step_count,duration_seconds,filename,timestamp,model,quality,seed,prompt" > "$log_file"
    echo "Recording timing data in: steps.csv"
    
    # Run for each step count in the multi_steps list
    IFS=',' read -ra STEP_COUNTS <<< "$multi_steps"
    for step_count in "${STEP_COUNTS[@]}"; do
        # Generate distinct filename for this step count
        timestamp=$(date +"%Y%m%d_%H%M%S")
        prompt_part=$(echo "$prompt" | awk '{for(i=1;i<=5 && i<=NF;i++) printf "%s_", $i; print ""}' | sed 's/_$//')
        prompt_part="${prompt_part:0:30}"
        filename="${timestamp}_${step_count}steps_${prompt_part}.png"
        step_output="${output_dir}/${filename}"
        step_output=$(echo "$step_output" | sed 's/[^a-zA-Z0-9_.-/]/_/g')
        filename=$(echo "$filename" | sed 's/[^a-zA-Z0-9_.-]/_/g')
        
        # Build the command with this step count
        step_command="mflux-generate --model $model --prompt \"$prompt\" --steps $step_count -q $quality --width $width --height $height"
        if [ ! -z "$seed" ]; then
            step_command="$step_command --seed $seed"
        fi
        step_command="$step_command $metadata --output $step_output"
        
        echo ""
        echo "===== Running with $step_count steps ====="
        echo "Executing: $step_command"
        
        # Execute the command and time it
        echo "Starting generation at $(date +"%H:%M:%S")"
        start_time=$(date +%s)
        eval $step_command
        end_time=$(date +%s)
        duration=$((end_time - start_time))
        current_timestamp=$(date +"%Y-%m-%d %H:%M:%S")
        echo "Generation completed in ${duration} seconds ($(date +"%H:%M:%S"))"
        echo "Generated image saved as: $filename"
        
        # Record the timing data
        echo "$step_count,$duration,$filename,$current_timestamp,$model,$quality,$seed,\"$prompt\"" >> "$log_file"
        
        # Try to open the image if it's the final step
        if [ "$step_count" = "$(echo "${STEP_COUNTS[@]}" | tr ' ' '\n' | tail -n1)" ]; then
            echo "Opening final image..."
            open "$step_output" 2>/dev/null || echo "Could not open image. You may need to view it manually."
        fi
    done
    
    echo ""
    echo "All step variations completed. Data saved to steps.csv"
    exit 0
fi

# For single step execution
# Execute the command and time it
echo "Starting generation at $(date +"%H:%M:%S")"
start_time=$(date +%s)
eval $command
end_time=$(date +%s)
duration=$((end_time - start_time))
echo "Generation completed in ${duration} seconds ($(date +"%H:%M:%S"))"

# Show the output file
echo "Generated image saved as: $filename"

# Open the image file with the "open" command
echo "Opening image with 'open' command..."
open "$output" 2>/dev/null || echo "Could not open image. You may need to view it manually."